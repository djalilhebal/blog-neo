---
date: 2023-04-07
title: "Nafa: Building a simplistic video streaming server"
---

# Nafa: Building a simplistic video streaming server
_#ffmpeg #http #expressjs_

This is not a tutorial. Well, it kind of is, but it teaches you nothing new or novel. Nada. Nafa(?)

Topics mentioned:
- ffmpeg: Detecting scenes and detecting the start of timestamps
- HTTP range requests

---

Imagine waking up at 1 AM and suddenly remembering this paragraph:

> Usually, a video file can be split into equal size chunks based on timestamps but Netflix instead splits chunks based on scenes. This slight variation becomes a huge factor for a better user experience since whenever the client requests a chunk from the server, there is a lower chance of interruption as a complete scene will be retrieved.
> 
> -- [_File Chunker, Video processing, Netflix, Chapter V, System Design Course_][system-design]

Premise: When the user requests a part, send them a range that satisfies the request and ensure it covers the end of the scene.

Request: Range: A-B  
Response: A-B-C

TODO: Image


## References

- [System Design Course by Karan Pratap Singh | GitHub][system-design]

[system-design]: https://github.com/karanpratapsingh/system-design
