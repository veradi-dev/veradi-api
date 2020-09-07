def create_question_name(subject_code, unit_code, writer, created_at):
    return (
        f"VE_"
        f"{subject_code.upper()}_"
        f"AAAA_"
        f"{unit_code.upper()}_"
        f"{writer.get_full_name()}_"
        f"{created_at}"
    )
