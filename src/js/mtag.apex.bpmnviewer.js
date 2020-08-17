/* global apex, BpmnJS */

(function( $, region ){

  $.widget( "mtag.bpmnviewer", {
    options: {
      ajaxIdentifier: null,
      itemsToSubmit: null,
      noDataFoundMessage: "Could not load Diagram",
      refreshOnLoad: false,
      currentClass: "mtbv-is-current",
      completedClass: "mtbv-is-completed",
      lastCompletedClass: "mtbv-is-last-completed",
      useNavigatedViewer: false,
      enableExpandModule: true
    },
    _create: function() {
      this._defaultXml =
        "<?xml version='1.0' encoding='UTF-8'?>" +
        "<bpmn:definitions xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:bpmn='http://www.omg.org/spec/BPMN/20100524/MODEL' xmlns:bpmndi='http://www.omg.org/spec/BPMN/20100524/DI' id='Definitions_1wzb475' targetNamespace='http://bpmn.io/schema/bpmn' exporter='bpmn-js (https://demo.bpmn.io)' exporterVersion='7.2.0'>" +
        "<bpmn:process id='Process_0rxermh' isExecutable='false' />" +
        "<bpmndi:BPMNDiagram id='BPMNDiagram_1'>" +
        "<bpmndi:BPMNPlane id='BPMNPlane_1' bpmnElement='Process_0rxermh' />" +
        "</bpmndi:BPMNDiagram>" +
        "</bpmn:definitions>";
      this.regionId    = this.element[0].id;
      this.canvasId    = this.regionId + '_canvas';
      this.enabledModules = [];
      if ( this.options.enableExpandModule ) {
        this.enabledModules.push( bpmnViewer.customModules.spViewModule );
      }
      if ( this.options.useNavigatedViewer ) {
        this.bpmnViewer$ = new bpmnViewer.BpmnJSNavigated({ container: '#' + this.canvasId, additionalModules: this.enabledModules });
      } else {
        this.bpmnViewer$ = new bpmnViewer.BpmnJS({ container: '#' + this.canvasId, additionalModules: this.enabledModules });
      }
      if ( this.options.refreshOnLoad ) {
        this.refresh();
      }
      region.create( this.regionId, {
        widget: () => { return this.element; },
        refresh: () => { this.refresh(); },
        reset: () => { this.reset(); },
        loadDiagram: () => { this.loadDiagram(); },
        addMarkers: () => { this.addMarkers(); },
        getViewerInstance: () => { return this.bpmnViewer$; },
        getEventBus: () => { return this.bpmnViewer$.get('eventBus'); },
        widgetName: "bpmnviewer",
        type: "mtag.bpmnviewer"
      });
    },
    loadDiagram: async function() {
      $( "#" + this.canvasId ).show();
      $( "#" + this.regionId + " span.nodatafound" ).hide();
      const bpmnViewer$ = this.bpmnViewer$;
      try {
        const result = await bpmnViewer$.importXML( this.diagram || this._defaultXml );
        const { warnings } = result;
        apex.debug.warn( "Warnings during XML Import", warnings );

        this.zoom( "fit-viewport" );
        this.addMarkers( this.current, this.options.currentClass );
        this.addMarkers( this.completed, this.options.completedClass );
        this.addMarkers( this.lastCompleted, this.options.lastCompletedClass );
      } catch (err) {
        apex.debug.error( "Loading Diagram failed.", err, this.diagram );
      }
    },
    addMarkers: function( markers, markerClass ) {
      let canvas = this.bpmnViewer$.get( "canvas" );
      if ( Array.isArray( markers ) ) {
        markers.forEach( currentMarker => {
          canvas.addMarker( currentMarker, markerClass );
        });
      } else if ( markers ) {
        canvas.addMarker( markers, markerClass );
      } else {
        apex.debug.warn( "No markers received?", markers );
      }
    },
    zoom: function( zoomOption ) {
      this.bpmnViewer$.get( "canvas" ).zoom( zoomOption );
    },
    expandElement: function( element ) {
      // TODO: implement
    },
    refresh: function() {
      apex.debug.info( "Enter Refresh", this.options );
      apex.server.plugin( this.options.ajaxIdentifier, {
        pageItems: $( this.options.itemsToSubmit, apex.gPageContext$ )
      }, {
        refreshObject: "#" + this.canvasId,
        loadingIndicator: "#" + this.canvasId
      }).then( pData => {
        if ( pData.found ) {
          this.diagram       = pData.data.diagram;
          this.current       = pData.data.current;
          this.completed     = pData.data.completed;
          this.lastCompleted = pData.data.lastCompleted;
          this.loadDiagram();
        } else {
          $( "#" + this.canvasId ).hide();
          $( "#" + this.regionId + " span.nodatafound" ).show();
        }
      });
    },
    reset: function() {

    }
  })

})( apex.jQuery, apex.region );
