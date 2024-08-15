/*

Client-side

// ----- T ----- //

// id required, works like the useGT() hook

<T id='x'> 

// ----- NUMERIC ----- //

// all these work the same

const dictionary = {
    "y": {
        "singular": "I have 1 new message.",
        "plural": <>I have <Num/> new messages.</>
    }
} || {
    "y.singular": "I have 1 new message.",
    "y.plural": <>I have <Num/> new messages.</>
}

1.

<Numeric id='y' n={someNumber}/>

2.

// ... const t = useGT()

<Numeric singular={t('y.singular')} n={someNumber}>
    {t('y.plural')}
</Numeric>

// with the props being an override and backup if no id extensions are found

// ----- VALUE ----- //

const dictionary = {
    "naming": <>Their name is <Var name="name" /></>,
    "naming.male": <>His name is <Var name="name" /></>,
    "naming.female": <>Her name is <Var name="name" /></>
}

1.

const name = "Sam"

<Value id='naming' values={{name}}/>
// just displays the client-side value

2. 

// ... const t = useGT()

<Value 
    id='naming' // default 
    values={{name, gender}}
    branches={
        "gender": {
            "male": t('naming.male'),
            "female": t('naming.female')
        }
    }
/>

3. 

<Value values={{name}}>
    {t('naming')} // literally the same as id='naming' (which overrides this)
</Value>

// <T id='myID'> and t('myID') can be used interchangeably
// (although pure text should probably use the hook/function)

*/