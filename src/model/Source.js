export class ConfluenceSourceConfig {
    constructor(id, config_name, source_name, full_config_name,
        full_source_name, source_type, space_key,
        recursive_fetch, fetch_attachments, checked_items, parent_items, selected_item_tree,
        full_item_tree) {
        this.id = id;
        this.config_name = config_name;
        this.config_name = config_name;
        this.source_name = source_name;
        this.full_config_name = full_config_name;
        this.full_source_name = full_source_name;
        this.source_type = source_type;
        this.space_key = space_key;
        this.recursive_fetch = recursive_fetch;
        this.fetch_attachments = fetch_attachments;
        this.checked_items = checked_items;
        this.parent_items = parent_items;
        this.selected_item_tree = selected_item_tree;
        this.full_item_tree = full_item_tree;
    }
}