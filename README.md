# YouVersion-API

Express Rest API for getting verses and such from YouVersion.

# Building and Running

> **Note**
> I use `pnpm` in these examples. `NPM` will also work if you don't have or want to install `pnpm`

First step is of course installing the modules

```
pnpm i
```

## Building

To build I think you can just use the `tsc` command.

```bash
tsc
```

If you cannot use `tsc` try

```bash
npx tsc
```

## Running

And to run use

```bash
pnpm run start
```

# Making Requests

| Query   | Default | Required | Example     |
| ------- | ------- | -------- | ----------- |
| book    | None    | true     | John or JHN |
| chapter | 1       | false    | 7 or 10     |
| verses  | 1       | false    | 1-3 or 7-10 |
| version | NIV     | false    | KJV or NLT  |

## Examples

Gets `John 1:1 NIV`

```
https://serverAddress.com/api/v1/verse?book=John
```

<br>

Gets `John 3:16 NLT`

```
https://serverAddress.com/api/v1/verse?book=John&chapter=3&verses=16&version=NLT
```

---

## Responses

Requests return a JSON object and a status code.

### Good Responses

A good API call responds with a `200 OK` and the requested verse(s).

```json
{
  "citation": "John 3:16 NLT",
  "passage": "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life."
}
```

<br>

Checking the API status is pretty simple, just make a request to the following route and if everything is fine it'll respond with a `200 OK` and no JSON object.
```
https://serverAddress.com/api/v1/status
```

### Bad Responses

If no book is specified in the query, it will prompt a `400 Bad Response` and an error message

```json
{
  "code": 400,
  "message": "Missing field 'book'"
}
```

<br>

Trying to access a book that does not exist will prompt a similar `400 Bad Response` but with a different error message

```json
{
  "code": 400,
  "message": "Could not find book 'Coffee' by name or alias."
}
```

# Options and Queries

<details>
<summary>Books and Aliases</summary>

| Book              | Alias |
| ----------------- | ----- |
| Genesis           | GEN   |
| Exodus            | EXO   |
| Leviticus         | LEV   |
| Numbers           | NUM   |
| Deuteronomy       | DEU   |
| Joshua            | JOS   |
| Judges            | JDG   |
| Ruth              | RUT   |
| 1st Samuel        | 1SA   |
| 2nd Samuel        | 2SA   |
| 1st Kings         | 1KI   |
| 2nd Kings         | 2KI   |
| 1st Chronicles    | 1CH   |
| 2nd Chronicles    | 2CH   |
| Ezra              | EZR   |
| Nehemiah          | NEH   |
| Esther            | EST   |
| Job               | JOB   |
| Psalms            | PSA   |
| Proverbs          | PRO   |
| Ecclesiastes      | ECC   |
| Song of Songs     | SNG   |
| Isaiah            | ISA   |
| Jeremiah          | JER   |
| Lamentations      | LAM   |
| Ezekiel           | EZK   |
| Daniel            | DAN   |
| Hosea             | HOS   |
| Joel              | JOL   |
| Amos              | AMO   |
| Obadiah           | OBA   |
| Jonah             | JON   |
| Micah             | MIC   |
| Nahum             | NAM   |
| Habakkuk          | HAB   |
| Zephaniah         | ZEP   |
| Haggai            | HAG   |
| Zechariah         | ZEC   |
| Malachi           | MAL   |
| Matthew           | MAT   |
| Mark              | MRK   |
| Luke              | LUK   |
| John              | JHN   |
| Acts              | ACT   |
| Romans            | ROM   |
| 1st Corinthians   | 1CO   |
| 2nd Corinthians   | 2CO   |
| Galatians         | GAL   |
| Ephesians         | EPH   |
| Philippians       | PHP   |
| Colossians        | COL   |
| 1st Thessalonians | 1TH   |
| 2nd Thessalonians | 2TH   |
| 1st Timothy       | 1TI   |
| 2nd Timothy       | 2TI   |
| Titus             | TIT   |
| Philemon          | PHM   |
| Hebrews           | HEB   |
| James             | JAS   |
| 1st Peter         | 1PE   |
| 2nd Peter         | 2PE   |
| 1st John          | 1JN   |
| 2nd John          | 2JN   |
| 3rd John          | 3JN   |
| Jude              | JUD   |
| Revelation        | REV   |

</details>

<details>
<summary>Versions</summary>

| Versions | ID   |
| -------- | ---- |
| AMP      | 1588 |
| ICL00D   | 1196 |
| KJV      | 1    |
| NIV      | 111  |
| NLT      | 116  |
| NR06     | 122  |
| VULG     | 823  |

</details>
