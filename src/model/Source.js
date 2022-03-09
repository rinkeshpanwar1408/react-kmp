export class SourceConfig {
    constructor(configName, source_name, full_config_name,
        full_source_name, sourceType, spaceKey,
        recursiveFetch, fetchAttachments, checked_pages, parent_data, pageIdList,
        includePageNames = [], includePageNamesRegex = "", artifactKeys = []) {

        this.configName = configName;
        this.source_name = source_name;
        this.full_config_name = full_config_name;
        this.full_source_name = full_source_name;
        this.sourceType = sourceType;
        this.spaceKey = spaceKey;
        this.recursiveFetch = recursiveFetch;
        this.fetchAttachments = fetchAttachments;
        this.checked_pages = checked_pages;
        this.parent_data = parent_data;
        this.pageIdList = pageIdList;
        this.includePageNames = includePageNames;
        this.includePageNamesRegex = includePageNamesRegex;
        this.artifactKeys = artifactKeys;
    }
}
