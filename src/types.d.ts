
export interface Artwork {
    id:                            number;
    api_model:                     string;
    api_link:                      string;
    is_boosted:                    boolean;
    title:                         string;
    alt_titles:                    null;
    thumbnail:                     Thumbnail;
    main_reference_number:         string;
    has_not_been_viewed_much:      boolean;
    boost_rank:                    null;
    date_start:                    number;
    date_end:                      number;
    date_display:                  string;
    date_qualifier_title:          string;
    date_qualifier_id:             null;
    artist_display:                string;
    place_of_origin:               string;
    description:                   string;
    short_description:             null;
    dimensions:                    string;
    dimensions_detail:             DimensionsDetail[];
    medium_display:                string;
    inscriptions:                  null;
    credit_line:                   string;
    catalogue_display:             null;
    publication_history:           string;
    exhibition_history:            string;
    provenance_text:               null;
    edition:                       null;
    publishing_verification_level: string;
    internal_department_id:        number;
    fiscal_year:                   number;
    fiscal_year_deaccession:       null;
    is_public_domain:              boolean;
    is_zoomable:                   boolean;
    max_zoom_window_size:          number;
    copyright_notice:              string;
    has_multimedia_resources:      boolean;
    has_educational_resources:     boolean;
    has_advanced_imaging:          boolean;
    colorfulness:                  number;
    color:                         Color;
    latitude:                      null;
    longitude:                     null;
    latlon:                        null;
    is_on_view:                    boolean;
    on_loan_display:               null;
    gallery_title:                 null;
    gallery_id:                    null;
    nomisma_id:                    null;
    artwork_type_title:            string;
    artwork_type_id:               number;
    department_title:              string;
    department_id:                 string;
    artist_id:                     number;
    artist_title:                  string;
    alt_artist_ids:                any[];
    artist_ids:                    number[];
    artist_titles:                 string[];
    category_ids:                  string[];
    category_titles:               string[];
    term_titles:                   string[];
    style_id:                      null;
    style_title:                   null;
    alt_style_ids:                 any[];
    style_ids:                     any[];
    style_titles:                  any[];
    classification_id:             string;
    classification_title:          string;
    alt_classification_ids:        string[];
    classification_ids:            string[];
    classification_titles:         string[];
    subject_id:                    string;
    alt_subject_ids:               string[];
    subject_ids:                   string[];
    subject_titles:                string[];
    material_id:                   string;
    alt_material_ids:              string[];
    material_ids:                  string[];
    material_titles:               string[];
    technique_id:                  null;
    alt_technique_ids:             any[];
    technique_ids:                 any[];
    technique_titles:              any[];
    theme_titles:                  string[];
    image_id:                      string;
    alt_image_ids:                 string[];
    document_ids:                  any[];
    sound_ids:                     any[];
    video_ids:                     any[];
    text_ids:                      any[];
    section_ids:                   any[];
    section_titles:                any[];
    site_ids:                      any[];
    suggest_autocomplete_all:      SuggestAutocompleteAll[];
    source_updated_at:             Date;
    updated_at:                    Date;
    timestamp:                     Date;
}

export interface Color {
    h:          number;
    l:          number;
    s:          number;
    percentage: number;
    population: number;
}

export interface DimensionsDetail {
    depth:         null;
    width:         number;
    height:        number;
    diameter:      null;
    clarification: null | string;
}

export interface SuggestAutocompleteAll {
    input:    string[];
    contexts: Contexts;
    weight?:  number;
}

export interface Contexts {
    groupings: string[];
}

export interface Thumbnail {
    lqip:     string;
    width:    number;
    height:   number;
    alt_text: string;
}

export interface ApiResponseData<T> {
    data: T[];
    info: {
            license_text: string[];
            license_links: string[];
            version: string;
    };
    config: {
            iiif_url: string;
            website_url: string;
    };
    pagination: {
        total: number;
        limit: number;
        offset: number;
        total_pages: number;
        current_page: number;
        next_url: string;
    };
}

