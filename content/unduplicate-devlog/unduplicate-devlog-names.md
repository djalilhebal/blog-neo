---
title: "Unduplicate: About Names"
---

# Learning record linkage. Names. (Unduplicate)


## Names

After inspecting the dataset, I came across many non-Arab names, many of them seem to be of Chinese origin, like (not their actual names):
Liu Yi Yi, Bai Yu Er, Wu Xin, Jian Yin, Sai Hua Tuo,[^sword-drama-cast]
Yin Chen, Qi Ling, Qi La,[^imdb-lord-2016]
Qiao Ling, and last but not least our beloved Cheng Xiaoshi[^imdb-link-click].

[sword-drama-cast]: https://mydramalist.com/8311-the-sword-and-the-chess-of-death/cast
[imdb-lord-2016]: https://www.imdb.com/title/tt4819576/
[imdb-link-click]: https://www.imdb.com/title/tt14976292

### Assumptions

- All names are spelled as they are pronounced, maybe using the French orphography.
The way you pronounce _CHA_ and _H_ in _CHAHINAZ BOSSWOMAN_.

- Names are kind of Arabic origins, like AHMED or BAHMED.


## Number of comparisons

Comparing pairs is much better than comparing every record with every other record.
`N * (N - 1) / 2` is much better than `N * (N - 1)`.

Suppose we have (N = 3): `A, B, C`
Every x every: `A-B, A-C, B-A, B-C, C-A, C-B`
Pairwise: `A-B, A-C, B-C`


Count of records is 60872;

Number of required pairwise comparisons:
60872 * (60872 - 1)/2 = 1852669756;


---

END.
