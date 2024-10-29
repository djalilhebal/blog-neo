# Testing HAProxy cache
#HAProxy #HTTP #Caching

Tagline: Applying what we learned in school.

- [ ] [L’aïki et la résilience 回復力 – Aiki Keisei 合気形成](https://web.archive.org/web/20211020095512/https://aikikeisei.com/2019/04/14/laiki-et-la-resilience/)


## Background

INTO 1 (OPTIONAL):
Namaene may not be impressive, but a lot of thought and planning was put into it.

INTO 1 (OPTIONAL):
Our master's thesis was almost called Kaiko, as in the genderswap of-- nevermind.
My binôme wasn't that much of a degen to allow that.

INTO 1:
Our memoire is titled Kaiku, as in _**Kai**fuku-ryo**ku**_ (resilience in Japanese).
Now (2023-12-14 sleepless night) that I think about it, it feels like a lost opportunity to call it Kai8ku a la K8s.

Memoire was about many things. Complex topics like distributed systems, specifically microservices, their orchestration (whatever this means), communication patterns, and fault tolerance... and caching, why not.

One of things we learned about was caching and projects/products like HAProxy, Varnish, Caddy, etc.


### About caching and rules

Browser cache vs proxy cache.

`s-maxage` vs `max-age` directives.

How HAProxy cache works.
TTL = min(specified max-age || default max-age, s-maxage || max-age || Expires)

### Writing a simple origin server

Write a simple express server that logs a counter.

### Installing and configuring

Install locally, on Windows.
Configure it to (reverse) proxy or map 8080 to 3000.

`curl -x GET http://localhost:8080/api/count`
(`GET` is the default method (`-x` argument), but just specify it for clarify.)

### Testing HAProxy

Test. Work.

Add cache.

Should only be called once.

## Testing HAProxy

- [ ] ~~SKIM~~ READ: How to Run HAProxy with Docker (In-Depth Guide) https://www.haproxy.com/blog/how-to-run-haproxy-with-docker
- [ ] Via Docker https://hub.docker.com/_/haproxy/

### Installing HAProxy via apt

Say you are on Ubuntu and Debian (or WSL Ubuntu):

Checking the OS version
```sh
lsb_release -a
```
Returns
```
No LSB modules are available.
Distributor ID: Ubuntu
Description:    Ubuntu 22.04.3 LTS
Release:        22.04
Codename:       jammy
```

Install HAProxy
```sh
apt install haproxy
```

Checking the installation
```sh
haproxy -v
```
Returns
```
HAProxy version 2.4.22-0ubuntu0.22.04.3 2023/12/04 - https://haproxy.org/
Status: long-term supported branch - will stop receiving fixes around Q2 2026.
Known bugs: http://www.haproxy.org/bugs/bugs-2.4.22.html
Running on: Linux 4.4.0-19041-Microsoft #2311-Microsoft Tue Nov 08 17:09:00 PST 2022 x86_64
```

Edit the config using `nano` or `vim` if you are feeling courageous.
```sh
#vim /etc/haproxy/haproxy.cfg
nano /etc/haproxy/haproxy.cfg
```

---

## Learning

- [x] SKIM Step-by-Step Guide to Installing and Configuring HAProxy on Ubuntu
https://blog.ehoneahobed.com/install-configure-haproxy-ubuntu

- [x] SKIM: HAProxy Configuration Basics: Load Balance Your Servers
https://www.haproxy.com/blog/haproxy-configuration-basics-load-balance-your-servers
    * Opinion: Fine.

- [x] SKIM: Backends | HAProxy config tutorials
https://www.haproxy.com/documentation/haproxy-configuration-tutorials/core-concepts/backends/
    * `check` is based on TCP responsiveness.

- [x] SKIM: Caching | HAProxy config tutorials
https://www.haproxy.com/documentation/haproxy-configuration-tutorials/network-performance/caching/

- [x] [HAProxy HTTP vs TCP - Server Fault](https://serverfault.com/questions/611272/haproxy-http-vs-tcp)
    * TLDR: `mode http` is to access HTTP headers.
    Why? So we can check the Host header for name-based virtual hosting.

Route http-request based on destination IP - Help! - HAProxy community
https://discourse.haproxy.org/t/route-http-request-based-on-destination-ip/2576
```
frontend https-in
    acl host_1 hdr(host) -i www.domain1.net
    acl host_2 hdr(host) -i www.domain2.net
    use_backend worker_1 if host_1
    use_backend worker_2 if host_2
```

```
frontend some_fe
    acl destination1 dst 192.168.1.1
    acl destination2 dst 192.168.1.2
    use_backend worker_1 if destination1
    use_backend worker_2 if destination2
```

- [ ] How to Map Domain Names to Backend Server Pools With HAProxy
https://www.haproxy.com/blog/how-to-map-domain-names-to-backend-server-pools-with-haproxy

- [x] [Virtual hosting | Wikipedia](https://en.wikipedia.org/wiki/Virtual_hosting)
    * Visited 2023-12-17

console.log(`New req to /api/counter: ip=${req.ip} timestamp={new Date().toISOString()}`);

---

END.
