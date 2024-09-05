/*

FUTURE PROMPT

I want to add TypeScript IDE autocomplete to my internationalization library. How it works is a user defines a dictionary. 
Keys in the dictionary are strings while items are one of:
- Nested dictionaries (to any degree of nesting)
- Strings, like "Hello, world"
- Arbitrary JSX, like <p>Hello, world</p>
- Arrays of length 2 where the first item is a string/JSX and the second item is a Record<string, any> containing metadata

For example:

```
{
    "hello": "Hello"
    "nested_example": {
        "example_one": <>This is a JSX tag</>
        "example_two": "This is a string"
    }
    "example_with_metadata": ["Hey there!", { context: "Translate informally" }]
}
```

My library has a t() function which translates an item in the dictionary according to its id. For example:

t('hello') // translation of "hello" depending on the user's language

t('nested_example.example_one') // translation of <>This is a JSX string</>

When the t() function is used on its own, it should autocomplete to ids where it will return some content, i.e. the deepest IDs. 
That means in the above example t() should autocomplete to:
- "hello" | "nested_example.example_one" | "nested_example.example_two" | "example_with_metadata"

There is also a getGT() function which navigates down a route in the dictionary and returns a modified t().

For example, when getGT('nested_example') is called, it returns a t() function whose autocompletes are:
- "example_one" | "example_two" 

getGT() itself should autocomplete to any key in the dictionary, including ones that are nested. 
In this example, it should autocomplete to:
- "hello" | "nested_example" | "nested_example.example_one" | "nested_example.example_two" | "example_with_metadata"

Dictionaries are defined by the user in a file they decide, by default something like './src/dictionary.js'.

How do I add TypeScript IDE autocomplete to my library?

*/