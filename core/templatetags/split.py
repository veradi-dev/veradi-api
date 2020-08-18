from django import template

register = template.Library()


@register.filter
def split(value: str, arg: str) -> list:
	"""Split String into list by whitespace"""
	return value.split(arg)


@register.filter
def split_to_int(value: str, arg: str) -> list:
	"""Split String into list by whitespace"""
	value = [int(value) for value in value.split(arg)]
	return value

