# Using a private GitHub repo as a CMS
_#github #vercel #git #ssh_

TLDR: GitHub deploy keys + GitHub webhooks + Vercel webhook.

Premise:
Download a private repo
...

Sure, we could use GitHub REST API (https://docs.github.com/en/rest).

Project: Contentless (as in "discontented" and _not_ "without content")

`contentless/`
`contentless-data/`


## Steps

- Git Bash
```sh
ssh-keygen -t ed25519 -C "Puller"
```

- GitHub repo / Settings / Deploy keys.
Add deploy key.

- [x] Test
```sh
echo "$PULLER_PRIVATE_KEY" > puller.pk
git -c core.sshCommand="ssh -i puller.pk" clone git@github.com:SomeUsername/my-content.git
```

- Vercel project / Settings / Environment Variables.
Add the private key's content as `PULLER_PRIVATE_KEY`.

- Vercel project / Settings / Git / Deploy Hooks.
Create hook, for example "**OnContent** on `main`".

- GitHub repo / Settings / Webhooks / Add webhook.
Add Vercel's deploy link for _push_ events (default).
PS: GitHub automatically sent a ping event to the deploy webhook. Vercel redeployed the project. It works.


- [ ] Does Vercel build image's `git` support ssh?
It should.
