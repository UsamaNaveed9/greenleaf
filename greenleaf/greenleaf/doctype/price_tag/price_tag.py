# Copyright (c) 2023, GreenLeaf and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class PriceTag(Document):
	pass

@frappe.whitelist()
def get_items_count(group = None):
	filters = ""
	if group:
		filters += "and item_group = '{0}'".format(group)
	item = frappe.db.sql('''select count(item_code) as total from `tabItem` where disabled = 0 {0} 
							order by creation '''.format(filters), as_dict = 1)
	return item[0]['total']


@frappe.whitelist()
def get_group_items(group = None,start = None,end = None):
	filters = ""
	if not start:
		start = 0
	if group:
		filters += "and item_group = '{0}'".format(group)
	if end:
		end = int(end) - int(start) + 1

	item = frappe.db.sql('''select item_code,item_name,description,sales_uom,image,stock_uom from `tabItem` where disabled = 0 {0} 
								order by creation limit {1} offset {2}'''.format(filters,end,start),as_dict = 1)

	return item								
