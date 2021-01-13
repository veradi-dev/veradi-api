def seconds_to_time(seconds):
    """
    seconds(초) 를 받아서
    (hours, minutes, seconds) 의 Tuple 형태로 Return
    """
    seconds = int(seconds)
    hours, seconds = divmod(seconds, 3600)
    minutes, seconds = divmod(seconds, 60)
    return hours, minutes, seconds
