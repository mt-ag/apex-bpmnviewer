# MTAG APEX BPMN-Viewer #

Region Plug-In for Oracle Application Express to display BPMN Diagrams.

## Purpose ##

Display a BPMN diagram based on XML pulled from any valid region source.  
Includes various options to visually highlight process state.  
Also allows switching between simple viewer or navigated viewer.

## Free Plug-In ##

This Plugin is released under MIT license, which means it is free to use in commercial or private projects.  

## Support available ##

Commercial support is available via our [Online APEX Support](https://apex.mt-ag.com/support).

## Demo ##

A demo of this Plug-In is available in the [Flows for APEX Demo](https://apex.oracle.com/pls/apex/mt_flows/r/flowsforapex).  
This demo includes the BPMN Modeler, the Flows for APEX engine and this Plug-In.

## Standard Installation ##

Import the plugin file `region_type_plugin_com_mtag_apex_bpmnviewer_region.sql` into your application.

## Advanced Installation ##

1. Import the plugin file `region_type_plugin_com_mtag_apex_bpmnviewer_region.sql` into your application.
2. Deploy the files found in the `src/css` and `src/js` folders to your Webserver.
3. Change "File Prefix" in plugin to match the deployment location.
4. Install the PL/SQL Package using `src/plsql/install_pkg.sql` or by running the `.pks` and the `.pkb` file.
5. Prefix the default values in `Render Procedure/Function Name` and `AJAX Procedure/Function Name` with `mtag_bpmnviewer.`.  
   If you installed the package in another schema than the parsing schema of the application add schema as prefix.  
   E.g.: `mtag_utils.mtag_bpmnviewer.render` and `mtag_utils.mtag_bpmnviewer.ajax`
