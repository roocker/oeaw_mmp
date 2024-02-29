# MMP-OpenAPI Reflection:

- the API is generally easy to use and documented well enough to get started quite easily
- the documentation could be more detailed. e.g. valid keys for the `ordering` parameter. german and english are mixed again in the documentation, which should be unified.
- there is no uniform convention for naming keys in data keys. German and english is used interchangeably as field keys (e.g. `text.autor`, `text.art` but `text.start_date`; stelle?); there are confusing `start_date` and `end_date` and `text.start_date` / `text.end_date` fields with different values; `text.orig_data_csv` could be duplicate/unneccessary data 
- for ensuring downwards compatibility for updates the API could be versionized (`../api/v1/stelle` indestad of `../api/stelle`). 
- there is no detailed error message sent to clients when an error occurs, just the http status code. for better error handling this should be improved.
- the API offers `next` and `previous` fields (for use in pagination for example), but no `last` which would make handeling results even easier; 
- when using `ordering=key_word` the results returned include duplicates, this might be due to wrongful useage
- `HATEOAS` could be used to provide contextual information and possible actions to clients
