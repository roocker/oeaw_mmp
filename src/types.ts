export interface MMPResult {
  [key: string]: any;
  id: number;
  summary: string;
  zitat: string;
  zitat_stelle: string;
  translation: string;
  start_date: number;
  end_date: number;
  kommentar: string;
  display_label: string;
  text: Text;
  key_word: KeyWord[];
  use_case: Array<MMPResult>;
}

export interface KeyWord {
  id: number;
  legacy_id: string;
  legacy_pk: number;
  stichwort: string;
  name_gr: string;
  art: string;
  varianten: string;
  wurzel: string;
  kommentar: null | string;
  orig_data_csv: string;
  related_keyword: Array<KeyWord>;
}

export interface Text {
  id: number;
  legacy_id: string;
  legacy_pk: number;
  title: string;
  alt_title: string;
  text_lang: string;
  jahrhundert: string;
  start_date: string;
  end_date: string;
  not_before: number;
  not_after: number;
  edition: string;
  kommentar: string;
  orig_data_csv: string;
  art: Art;
  autor: Autor[];
  ort: Ort[];
}

export interface Art {
  id: number;
  pref_label: string;
  pref_label_lang: string;
  top_concept: null;
  notation: string;
  related: string;
  broad_match: string;
  narrow_match: string;
  exact_match: string;
  related_match: string;
  close_match: string;
  legacy_id: string;
  creator: string;
  contributor: string;
  needs_review: null;
  date_created: Date;
  date_modified: Date;
  lft: number;
  rght: number;
  tree_id: number;
  level: number;
  scheme: number;
  broader_concept: null;
  created_by: null;
  collection: number[];
}

export interface Autor {
  id: number;
  legacy_id: string;
  legacy_pk: number;
  name: string;
  gnd_id: string;
  name_lat: string;
  name_en: string;
  name_fr: string;
  name_it: string;
  name_gr: string;
  jahrhundert: string;
  start_date: string;
  end_date: string;
  start_date_year: number;
  end_date_year: number;
  kommentar: string;
  orig_data_csv: string;
  ort: number;
}

export interface Ort {
  id: number;
  legacy_id: string;
  legacy_pk: number;
  name: string;
  norm_id: string;
  name_antik: string;
  name_de: string;
  name_fr: string;
  name_it: string;
  name_gr: string;
  long: number;
  lat: number;
  coords: Coords;
  fuzzy_geom: null;
  kommentar: string;
  orig_data_csv: string;
  art: number;
  kategorie: number;
}

export interface Coords {
  type: string;
  coordinates: number[];
}
