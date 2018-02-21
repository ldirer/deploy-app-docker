from typing import List

from backend.app import QuizQuestion


def sample_questions() -> List[QuizQuestion]:
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
        'choices': [answer_str, 'NameError', 'What the ...?']
    }

    sample_js = {
        'text': f"""Level: easy.
        What is the value of `[] + []` in JavaScript?
        """.strip(),
        'answer': "''",
        'choices': ["''", '[]', 'TypeError', 'undefined is not an array']
    }

    sample_js_2 = {
        'text': """
        Level: easy.
        What is the value of `{} + []` in JavaScript?
        """.strip(),
        'answer': "0",
        'choices': ["0", '[]', 'TypeError', '{}']
    }

    sample_js_3 = {
        'text': """
        What is the value of `[] + {}` in JavaScript?
        """.strip(),
        'answer': "'[object Object]'",
        'choices': ["'[object Object]'", '[]', 'TypeError', '{}']
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
            'post_answer_comment': 'Advanced JavaScript features may have different implementations in different browsers.'
        }
    }

    """TODO
    
    js: [] + {} --> '[object Object]' (as a string)
    {} + [] --> 0
    
    {} + {} --> '[object Object][object Object]' on chrome and in my node console, NaN on firefox. GJ BOYS.
    """
    return [QuizQuestion(**sample_js), QuizQuestion(**sample_python), QuizQuestion(**sample_js_2),
            QuizQuestion(**sample_js_3), QuizQuestion(**sample_js_4)]
