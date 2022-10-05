from django.contrib.admin.filters import (
    AllValuesFieldListFilter,
    ChoicesFieldListFilter,
    RelatedFieldListFilter,
    RelatedOnlyFieldListFilter,
    SimpleListFilter,
)


class SimpleDropdownFilter(SimpleListFilter):
    template = "admin/list_filter_dropdown.html"


class DropdownFilter(AllValuesFieldListFilter):
    template = "admin/list_filter_dropdown.html"


class ChoiceDropdownFilter(ChoicesFieldListFilter):
    template = "admin/list_filter_dropdown.html"


class RelatedDropdownFilter(RelatedFieldListFilter):
    template = "admin/list_filter_dropdown.html"


class RelatedOnlyDropdownFilter(RelatedOnlyFieldListFilter):
    template = "admin/list_filter_dropdown.html"
