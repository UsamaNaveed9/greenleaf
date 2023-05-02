// Copyright (c) 2023, GreenLeaf and contributors
// For license information, please see license.txt

frappe.ui.form.on('Price Tag', {
	get_items_count: function(frm) {
		if(frm.doc.item_group){
			frappe.call({
				method: "greenleaf.greenleaf.doctype.price_tag.price_tag.get_items_count",
				args: {
					"group": frm.doc.item_group
				},
				freeze: true,
    			freeze_message: "Processing",
				callback: function(r){
					if(r.message){
						//console.log(r.message);
						frm.doc.total_records = r.message;
						frm.doc.end = r.message;
						frm.doc.start = 0;
						cur_frm.refresh_fields();
						cur_frm.save();
					}
				}
			});
		}
	},
	get_items: function(frm){
		if(frm.doc.item_group && frm.doc.end){
			frappe.call({
				method: "greenleaf.greenleaf.doctype.price_tag.price_tag.get_group_items",
				args: {
					"group": frm.doc.item_group,
					"start": frm.doc.start,
					"end": frm.doc.end
				},
				freeze: true,
				freeze_message: "Processing",
				callback: function(r){
					if(r.message){
						//console.log(r.message);
						cur_frm.clear_table("items");
						for(var i=0;i<r.message.length;i++){
							var childrow = cur_frm.add_child("items");
							childrow.item = r.message[i]["item_code"];
							childrow.item_name = r.message[i]["item_name"];
							childrow.item_description = r.message[i]["description"];
							childrow.sales_uom = r.message[i]["sales_uom"];
							childrow.item_image = r.message[i]["image"];
							childrow.default_uom = r.message[i]["stock_uom"];
							cur_frm.refresh_fields("items");
						}
						cur_frm.save();
					}
				}
			})
		}
	}
}); 