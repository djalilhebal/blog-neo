# jee-omnisports
_#ModuleDAAW_


## Technologies Used

- JEE Servlet API

- Apache Tomcat 9: Servlet container

- MySQL: Relational database.
No MySQL-specific features/syntax were used. We should be able to replace it with Postgres.

- VueJS

- Cordova


## Mobile app?

On the last day, we decided to make a "mobile" app for extra points.

**Framework**

The fastest way was creating a web app wrapped in some kind of WebView.
Being familiar with Vue and Cordova, that's what we used. MDL to make it feel more native-y.

**API**

As for the API, we just used an `HTTPServlet` that returns JSON.

**Token = session id?**
The session id is used as the token.

The website and main logic uses sessions.

The `SessionContext` stores the session identifier in the cookies.
Turns out other ["session tracking modes" exist][jee6-SessionTrackingMode]: `COOKIE`, `URL`, and `SSL`.

Interesting `HttpServletRequest` methods:
- `getRequestedSessionId`
- `isRequestedSessionIdValid`
- `isRequestedSessionIdFromURL`

**Further reading**:
- [`ServletContext#getEffectiveSessionTrackingModes` - Java EE 6][jee6-getEffectiveSessionTrackingModes]
- [Session tracking options - WAS - IBM Documentation][was-tracking-session-options]
    * "In certain cases, clients cannot accept cookies. Therefore, you cannot use cookies as a session tracking mechanism. Applications can use URL rewriting as a substitute."

[jee6-SessionTrackingMode]: https://docs.oracle.com/javaee%2F6%2Fapi%2F%2F/javax/servlet/SessionTrackingMode.html
[jee6-getEffectiveSessionTrackingModes]: https://docs.oracle.com/javaee%2F6%2Fapi%2F%2F/javax/servlet/ServletContext.html#getEffectiveSessionTrackingModes()

[was-tracking-session-options]: https://www.ibm.com/docs/en/was-nd/9.0.5?topic=tracking-session-options

[From Tomcat / CoyoteAdapter](https://github.com/apache/tomcat/blob/4db15071f7920f1607c048960cf0ac3a1f50fd18/java/org/apache/catalina/connector/CoyoteAdapter.java#L704C4-L704C4)
```java
    // Now we have the context, we can parse the session ID from the URL
    // (if any). Need to do this before we redirect in case we need to
    // include the session id in the redirect
    String sessionID;
    if (request.getServletContext().getEffectiveSessionTrackingModes().contains(SessionTrackingMode.URL)) {

        // Get the session ID if there was one
        sessionID = request.getPathParameter(SessionConfig.getSessionUriParamName(request.getContext()));
        if (sessionID != null) {
            request.setRequestedSessionId(sessionID);
            request.setRequestedSessionURL(true);
        }
    }
```

- Changing the context' `sessionCookieName`:
    * [Apache Tomcat 7 Configuration Reference (7.0.109) - The Context Container](https://tomcat.apache.org/tomcat-7.0-doc/config/context.html#Defining_a_context)
    * KAITO: I assume changing `sessionCookieName` affects both the cookie name (in `SET-COOKIE`) and URL part.

- Where to set it though?
`server.xml`, `context.xml`, or `web.xml`, or even programmatically?
All of these seem to acheive the same result.



See `org.apache.catalina.SESSION_PARAMETER_NAME` in [Apache Tomcat Configuration Reference - System Properties (Tomcat 5.5)](https://tomcat.apache.org/tomcat-5.5-doc/config/systemprops.html).

See `sessionCookieName` in [Apache Tomcat 8 Configuration Reference (8.0.53) - The Context Container](https://tomcat.apache.org/tomcat-8.0-doc/config/context.html).

- [Renaming JSESSIONID – Giant Geek Blog](https://blog.giantgeek.com/?p=1270)
    * TLDR: `web.xml` or `context.xml`



- [JSessionID in Tomcat (Tomcat forum at Coderanch)](https://coderanch.com/t/701938/application-servers/JSessionID-Tomcat)
    * TLDR: Is it possible to replace semicolon ';' with another delimeter in jsessionid in the URL?
        + The semicolon is a special character (sub-delimiter) according to the URL spec.
        + The format is implementation-dependent.
        + The session ID may be changed by the server/container without notice.
        + You should not mess with session ID stuff (KAITO: unless you know what you are doing :3).


> **7.1.3 URL Rewriting**
>
> URL rewriting is the lowest common denominator of session tracking. When a client
will not accept a cookie, URL rewriting may be used by the server as the basis for
session tracking. URL rewriting involves adding data, a session ID, to the URL path
that is interpreted by the container to associate the request with a session.
The session ID must be encoded as a path parameter in the URL string. The name of
the parameter must be `jsessionid`. Here is an example of a URL containing encoded
path information:  
> `http://www.myserver.com/catalog/index.html;jsessionid=1234`
>
> -- Java™ Servlet Specification, Version 3.0

Interesting:
- [URL Rewriting Session Tracking in Servlet | Dot Net Tutorials](https://dotnettutorials.net/lesson/url-rewriting-servlet/)
    * Visited 2023-12-04

- [ ] [Session Management in Java - HttpServlet, Cookies, URL Rewriting | DigitalOcean](https://www.digitalocean.com/community/tutorials/java-session-management-servlet-httpsession-url-rewriting)

- [ ] [How to use a servlet filter in Java to change an incoming servlet request url? | Stack Overflow](https://stackoverflow.com/questions/2725102/)
    * TLDR: Use `req.getRequestDispatcher`


## TODO

- [ ] Remove `validWhats`

- [ ] Pass session id in the URL

- [ ] APIServlet: `Access-Control-Allow-Origin` is set twice
