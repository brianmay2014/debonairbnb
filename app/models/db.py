from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def print_filter(attname):
    if attname.startswith("_"):
        return False
    return True

def auto_str(cls):
    def __str__(self):
        if hasattr(self, "to_dict") and callable(self.to_dict):
            return str(self.to_dict())
        else:
            ret = dict(self.__dict__)
            ret = {k:v for k,v in ret.items() if print_filter(k)}
            # This will recursively call __str__ on the v's we have filtered
            return str(ret)
    cls.__str__ = __str__
    cls.__repr__ = __str__
    return cls
