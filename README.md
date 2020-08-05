# MTAG APEX BPMN-Viewer #

Region Plugin for Oracle Application Express to display BPMN Diagrams.

## Purpose ##

Display a BPMN diagram based on XML pulled from any valid region source.

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
