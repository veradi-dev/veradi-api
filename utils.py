def seconds_to_time(seconds):
    """
    seconds(초) 를 받아서
    (hours, minutes, seconds) 의 Tuple 형태로 Return
    """
    seconds = int(seconds)
    hours, seconds = divmod(seconds, 3600)
    minutes, seconds = divmod(seconds, 60)
    return hours, minutes, seconds


def get_aware_datetime(date_str):
    from django.utils.dateparse import parse_datetime
    from django.utils.timezone import is_aware, make_aware

    ret = parse_datetime(date_str)
    if not is_aware(ret):
        ret = make_aware(ret)
    return ret
