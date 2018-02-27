from typing import List

from backend.app import QuizQuestion


class SampleStore:
    """Just a class so that I can automatically put samples in a list. Slightly overkill.
    Technically putting all this at class level is a bit 'dangerous' as any error will kill the app if this
    module is imported.

    Everything starting with 'sample_' will be collected.
    """
    answer_str = 'Trick question?'
    sample_python = {
        'text': f"""
What is the output of the following python3 code?
```python3
_MyClass__my_string = '{answer_str}'

class MyClass(object):

    def __init__(self):
        pass

    def get_string(self):
        return __my_string

print(MyClass().get_string())
```
""".strip(),
        'answer': answer_str,
        'choices': [answer_str, 'NameError', 'Uh?'],
        'data': {
            'language': 'python',
            'is_wat': True
        }
    }

    sample_js = {
        'text': f"""Level: easy.
        What is the value of `[] + []` in JavaScript?
        """.strip(),
        'answer': "''",
        'choices': ["''", '[]', 'TypeError', 'undefined is not an array'],
        'data': {
            'language': 'js',
            'is_wat': True
        }
    }

    # TODO: WAT. let i = {} + [] --> i is '[object Object]'...
    sample_js_2 = {
        'text': """
Javascript console. Level: easy.  

```js
> {} + []
```
        """.strip(),
        'answer': "0",
        'choices': ["0", '[]', '[object Object]', '{}'],
        'data': {
            'language': 'js',
            'comment': "This is a feature, not a bug.",
            'is_wat': True
        }
    }

    sample_js_3 = {
        'text': """
What is the value of `[] + {}` in JavaScript?
        """.strip(),
        'answer': "'[object Object]'",
        'choices': ["'[object Object]'", '[]', 'TypeError', '{}'],
        'data': {
            'language': 'js',
            'is_wat': True
        }
    }

    sample_js_4 = {
        'text': """
        JavaScript.  
        
What is the value of `{} + {}` in JavaScript?
        """.strip(),
        'answer': "'[object Object][object Object]' on Chrome. NaN on Firefox.",
        'choices': ["'[object Object]'", "'[object Object][object Object]' on Chrome. NaN on Firefox.", '{}', "''"],

        'data': {
            'is_wat': True,
            'comment': 'Advanced JavaScript features may have different implementations in different browsers.',
            'language': 'js'
        }
    }

    sample_python_2 = {
        'text': """
Here are some Python commands entered in the interactive interpreter.  
What is the output of the last command?
```python3
Python 3.6.0 |Continuum Analytics, Inc.| (default, Dec 23 2016, 12:22:00) 
[GCC 4.4.7 20120313 (Red Hat 4.4.7-1)] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> a = 123 
>>> b = 123
>>> a is b
```
""".strip(),
        # Would be nice to find an almost-looks-realistic third choice
        'choices': ['True', 'False'],
        'answer': 'True',
        'data': {
            'language': 'python',
            'comment': 'This actually makes sense.'
        }
    }
    sample_python_3 = {
        'text': """
Here are some Python commands entered in the interactive interpreter.  
What is the output of the last command?
```python3
Python 3.6.0 |Continuum Analytics, Inc.| (default, Dec 23 2016, 12:22:00) 
[GCC 4.4.7 20120313 (Red Hat 4.4.7-1)] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> a = 1234
>>> b = 1234
>>> a is b
```
""".strip(),
        'choices': ['True', 'False'],
        'answer': 'False',
        'data': {
            'language': 'python',
            'is_wat': True
        }
    }
    sample_python_4 = {
        'text': """
Here are some Python commands entered in the interactive interpreter.  
What is the output of the last command?
```python3
Python 3.6.0 |Continuum Analytics, Inc.| (default, Dec 23 2016, 12:22:00) 
[GCC 4.4.7 20120313 (Red Hat 4.4.7-1)] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> a, b = 1234, 1234
>>> a is b
```
""".strip(),
        'choices': ['True', 'False'],
        'answer': 'True',
        'data': {
            'language': 'python',
            'is_wat': False,
            'comment': 'This makes sense. Right?'
        }
    }

    """TODO
    
    js: [] + {} --> '[object Object]' (as a string)
    {} + [] --> 0
    
    {} + {} --> '[object Object][object Object]' on chrome and in my node console, NaN on firefox. GJ BOYS.
    
    Python
    False == False in [False]
    -> True
    This is parsed as False == False and False in False
    """

    sample_python_5 = {
        'text': """
```python3
Python 3.6.0 
>>> a = [0] 
>>> b = a
>>> b[0] = 1
>>> a
```
""".strip(),
        'choices': ['[1]', '[0]'],
        'answer': '[1]',
        'data': {
            'language': 'python',
            'is_wat': False
        }
    }

    sample_python_6 = {
        'text': """
```python3
Python 3.6.0 
>>> a = [0] 
>>> b = list(a)
>>> b[0] = 1
>>> a
```
""".strip(),
        'choices': ['[1]', '[0]'],
        'answer': '[0]',
        'data': {
            'language': 'python',
            'is_wat': False
        }
    }

    sample_python_7 = {
        'text': """
```python3
Python 3.6.0 
>>> a = {'wat': False}
>>> b = {'expected': True}
>>> {**a, **b}
?
```
""".strip(),
        'choices': ['SyntaxError: invalid syntax', "{'expected': True, 'wat': False}"],
        'answer': "{'expected': True, 'wat': False}",
        'data': {
            'language': 'python',
            'is_wat': False,
            'comment': 'Feature introduced in python3.5'
        }
    }

    # Actually parsed as 'False == False and False in [False]'
    sample_python_8 = {
        'text': """
```python3
Python 3.6.0 
>>> False == False in [False]
?
```
""".strip(),
        'choices': ['SyntaxError: invalid syntax', "True", "False"],
        'answer': "True",
        'data': {
            'language': 'python',
            'is_wat': True,
            'comment': 'This is parsed as `False == False and False in [False]`.\n'
                       'Surely makes more sense with `1 < 2 < 3`.'
        }
    }
    sample_js_5 = {
        'text': """
```js
> let a = [1, 2, 3, [4, 5, 6]]
> let b = [...a]
> b[3][0] = 0
> a
?
```
""".strip(),
        'choices': ['[1, 2, 3, [0, 5, 6]]', '[1, 2, 3, [4, 5, 6]]', '[1, 2, 3, 0]'],
        'answer': "[1, 2, 3, [0, 5, 6]]",
        'data': {
            'language': 'javascript',
            'is_wat': False,
        }
    }

    sample_js_6 = {
        'text': """
```js
> let a = '1'
> a == 1
?
```
""".strip(),
        'choices': ['true', 'false', 'undefined'],
        'answer': 'true',
        'data': {
            'language': 'javascript',
            'is_wat': False
        }
    }


def sample_questions() -> List[QuizQuestion]:
    samples = [s for key, s in SampleStore.__dict__.items() if key.startswith('sample_')]
    return [QuizQuestion(**sample) for sample in samples]
