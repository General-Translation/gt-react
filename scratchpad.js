/*

Plural handling

----- INLINE -----

<Plural singular={
    <>I have one new message.</>
} n={3}>
    I have <Num/> new messages.
</Plural>

----- DICTIONARY -----

const { Num } = createVariables();
const dictionary = {
    "my_id": [<>I have <Num/> new messages.</>, { singular: <>I have one new message</> }]
}

// then...

t('my_id', { n: 3 });

or 

'use client'

const t = useGT();

t('my_id', { n: 3 })

// with generative plurals

*/