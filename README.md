# YouVersion-API

Express Rest API for getting verses and such from YouVersion.

# Building and Running

> **Note**
> I use `pnpm` in these examples. `NPM` will also work if you don't have or want to install `pnpm`

First step is of course installing the modules
```
pnpm i
```

To build I think you can just use the `tsc` command.
```bash
tsc
```

If you cannot use `tsc` try
```bash
npx tsc
```

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
| lang    | en-us   | false    | en-us       |

Gets `John 1:1 NIV`

```
https://serverAddress.com/api/v1/verse?book=John
```

Gets `John 3:16 NLT`

```
https://serverAddress.com/api/v1/verse?book=John&chapter=3&verses=16&version=NLT
```