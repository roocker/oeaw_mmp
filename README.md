# ACDH-CH Web Developer Assessment

MMP is a database application with passages (stelle) extracted from medieval manuscripts
(text).

This is my attempt at the coding challenge. 

Live Version: 
[https://mmp.roocker.dev](https://mmp.roocker.dev)

## Task

Implement a simple search view of the passages consuming the following REST-API (endpoint
/stelle): https://mmp.acdh-dev.oeaw.ac.at/api-docs/#stelle-list
Sample request: https://mmp.acdh-dev.oeaw.ac.at/api/stelle/?zitat=gentis&zitat_lookup=icontains
Start with a React 18 or Vue 3 template (TypeScript templates: https://vite.new/react-ts or
https://vite.new/vue-ts).
Requirements:
- Input field for the search keyword to be passed on as the zitat parameter
- Resultlist-item must contain at least the property: display_label and list of associated
keywords from the property key_word.stichwort
- List-size: restrict search-result to first 20 items (no pagination needed)
- On click on resultlist-item.title = > open detail-view of the corresponding item in the base
application, E.g.: https://mmp.acdh-dev.oeaw.ac.at/archiv/stelle/detail/3 (in new window)

## Proposed optional features/tasks:

Following are potential extensions of the functionality; you can select from and try to implement.
These are not required for the assignment to be considered fulfilled successfully.
- Structure result-list as table, exposing further properties from the result as
additional columns, e.g. the year range in which the source manuscript has been
created, using properties text.start_date and text.end_date
- Add name of author(s) in the list-item, dereferencing the property text.author
from the related entity
- implement pagination using the parameters limit and offset
- flexible length of one page (number of list items), i.e. allow user to adjust the
limit parameter
- propose an algorithm for sorting search results according to their relevance with
respect to the search term.
- Reflect on the quality of the API – Do you see any conceptual or formal weaknesses,
what would you do differently?
- Use tailwind for some minimal styling

# MMP-OpenAPI Reflection:

[./api-reflection.md](./api-reflection.md)
