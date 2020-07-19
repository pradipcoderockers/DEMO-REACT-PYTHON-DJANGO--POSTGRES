import ast


def safe_eval(source):
    try:
        return True, ast.literal_eval(source)
    except Exception:
        return False, source
