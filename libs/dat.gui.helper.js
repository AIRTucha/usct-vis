guiControls = new function() {
	this.gray_min = -1;
	this.gray_max = -1;
	this.steps = -1;
	this.number_slices = -1;
	this.render_size = 2;
	this.render_canvas_size = 7;
	this.row_col = -1 + "x" + -1;
	this.absorption_mode = -1;
	this.opacity_factor = -1;
	this.color_factor = -1;
	this.x_min = -1;
	this.x_max = -1;
	this.y_min = -1;
	this.y_max = -1;
	this.z_min = -1;
	this.z_max = -1;
	this.colormap = 13;
	this.thresholding = 4;
    
    this.refl = 0.5
    this.sos = 0.5
    this.sat = 0.5
    
	this.auto_steps = -1;
};

var UpdateGUI = function(config) {
	guiControls.number_slices = config["slices_range"][1];
	guiControls.gray_min = config["gray_min"];
	guiControls.gray_max = config["gray_max"];
	guiControls.row_col = config["row_col"][0] + "x" + config["row_col"][1];
	guiControls.steps = config["steps"];
	guiControls.absorption_mode = config["absorption_mode"];
	guiControls.opacity_factor = config["opacity_factor"];
	guiControls.color_factor = config["color_factor"];
	guiControls.x_min = config["x_min"];
	guiControls.x_max = config["x_max"];
	guiControls.y_min = config["y_min"];
	guiControls.y_max = config["y_max"];
	guiControls.z_min = config["z_min"];
	guiControls.z_max = config["z_max"];
	guiControls.auto_steps = config["auto_steps"];
    guiControls.refl = config["refl"];
    guiControls.sat = config["sat"];
    guiControls.sos = config["sos"];

};

var InitGUI = function(config, rcl2) {
	UpdateGUI( config );

	var gui = new dat.GUI();

	var x_min_controller = gui.add(guiControls, 'x_min', 0, 1, 0.1).listen();
	x_min_controller.onChange(function(value) {
		rcl2.setGeometryMinX(value);
	});

	var x_max_controller = gui.add(guiControls, 'x_max', 0, 1, 0.1).listen();
	x_max_controller.onChange(function(value) {
		rcl2.setGeometryMaxX(value);
	});

	var y_min_controller = gui.add(guiControls, 'y_min', 0, 1, 0.1).listen();
	y_min_controller.onChange(function(value) {
		rcl2.setGeometryMinY(value);
	});

	var y_max_controller = gui.add(guiControls, 'y_max', 0, 1, 0.1).listen();
	y_max_controller.onChange(function(value) {
		rcl2.setGeometryMaxY(value);
	});

	var z_min_controller = gui.add(guiControls, 'z_min', 0, 1, 0.1).listen();
	z_min_controller.onChange(function(value) {
		rcl2.setGeometryMinZ(value);
	});

	var z_max_controller = gui.add(guiControls, 'z_max', 0, 1, 0.1).listen();
	z_max_controller.onChange(function(value) {
		rcl2.setGeometryMaxZ(value);
	});

	steps_controller = gui.add(guiControls, 'steps', 10, rcl2.getMaxStepsNumber(), 1).listen();
	steps_controller.onFinishChange(function(value) {
		rcl2.setSteps(value);
	});

	var number_slices_controller = gui.add(guiControls, 'number_slices', 1, 2048, 1).listen();
	number_slices_controller.onFinishChange(function(value) {
		rcl2.setSlicesRange(0, value);
	});

	var auto_steps_controller = gui.add(guiControls, 'auto_steps').listen();
	auto_steps_controller.onChange(function(value) {
		rcl2.setAutoStepsOn(value);
	});

	var absorbtion_mode_controller = gui.add(guiControls, 'absorption_mode', {"Tumor Cutoff": 0, "Refl+Sos": 1, "Real Body": 2}).listen();
	absorbtion_mode_controller.onChange(function(value) {
		rcl2.setAbsorptionMode(value);
	});

	var color_factor_controller = gui.add(guiControls, 'color_factor', 0, 20, 0.1).listen();
	color_factor_controller.onChange(function(value) {
		rcl2.setColorFactor(value);
	});

	var opacity_factor_controller = gui.add(guiControls, 'opacity_factor', 0, 50, 0.1).listen();
	opacity_factor_controller.onChange(function(value) {
		rcl2.setOpacityFactor(value);
	});

	var gray_min_controller = gui.add(guiControls, 'gray_min', 0, 1, 0.1).listen();
	gray_min_controller.onChange(function(value) {
		rcl2.setGrayMinValue(value);
	});

	var gray_max_controller = gui.add(guiControls, 'gray_max', 0, 1, 0.1).listen();
	gray_max_controller.onChange(function(value) {
		rcl2.setGrayMaxValue(value);
	});
    
    var refl = gui.add(guiControls, 'refl', 0, 2, 0.1).listen();
	refl.onChange(function(value) {
		rcl2.setRefl(value);
	});
    
    var sos = gui.add(guiControls, 'sos', 0, 2, 0.1).listen();
	sos.onChange(function(value) {
		rcl2.setSos(value);
	});

    var sat = gui.add(guiControls, 'sat', 0, 2, 0.1).listen();
	sat.onChange(function(value) {
		rcl2.setSat(value);
	});


	var render_size_controller = gui.add(guiControls, 'render_size', {"128": 0, "256": 1, "512": 2, "768":3}, 2);
    
	render_size_controller.onFinishChange(function(value) {
		switch(value) {
			case "0": {
				$('#container').empty();
                
                config1['render_size']=[128,128];
                
                rcl2 = new VRC.VolumeRaycaster(config1);	  
			}; break;			
			case "1": {
				$('#container').empty();
                
                config1['render_size']=[256,256];
                
                rcl2 = new VRC.VolumeRaycaster(config1);  
			}; break;			
			case "2": {
				$('#container').empty();
                
                config1['render_size']=[512,512];
                
                rcl2 = new VRC.VolumeRaycaster(config1);
                
                
			}; break;			
			case "3": {
                $('#container').empty();
                
                config1['render_size']=[768,768];
                
                rcl2 = new VRC.VolumeRaycaster(config1);		    

			};  break;
		}
	});

	

};