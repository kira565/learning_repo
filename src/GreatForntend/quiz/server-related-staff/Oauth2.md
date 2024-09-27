# Oauth 2.0

## What is Oauth 2.0 ?

OAuth 2.0 is an evolution of the OAuth Protocol and is NOT backward compatible with OAuth 1.0. OAuth 2.1 is an in-progress effort to consolidate OAuth 2.0 and many common extensions under a new name.

OAuth 2.0 allows a website or app to access resources hosted by other web apps on behalf of a user without sharing the password.
Instead it uses an access token, which is handed to the app. An access token is a piece of data that represents the authorization to access resources on behalf of the end-user.

To obtain token, user logs in on the website of the Oauth server. An access token allows access to a resource for a limited time. In case the token gets compromissed
the access rights associated with the token can be revoked (отозвано). OAuth 2.0 is specified and standartized by RFC 6749

## Oauth related terms

### Authentication VS Authorization

There are two terms used in a context of Oauth and API security.

- Authentication answers the question - who you are
- Authorizarion ansers the question - what are you allowed to do

OAuth relies on both of them but does neither (полагается на них но не делает ни того ни другого)

- Authentication is performed by another component , eg by login page mechanism.
- Authorization needs to be performed by the API, which uses the token and information related to the token.

## OAuth’s actors

![alt text](https://miro.medium.com/v2/resize:fit:1100/format:webp/1*7X9wLfqPsj2xk65DN4JDow.png)

### Resource owner

In most cases resource owner is the person using client software to access the protected resorce by they own.
The resource owner i.e User delegates his access rights to the third party (client). This delegation by
the resource owner allows the 3rd party (client) to access his data. The resource owner might be
using web browser or mobile app but thats entirely dependent on the nature of the client

### Client

The client is an application that attempts to access a protected resource on behalf of the User. i.e resource owner
The client can be web app, mobile app, native app, cloud app etc. The main responsibility of the client is to
obtain tokens from the authorization server and using tokens at the protected resource. The client doesnt have
to understand the token, nor should it ever need to inspect the token content.

### Protected resource

A protected resource may be data or a service and is often offered in the form of an API. THe API must ensure that only
authenticated and uthorized users can access the data or service. It does this by using an OAuth access token which
should be a part of the request. For each incoming request the API first needs to check the validity of the provided access
token. Only requests with valid access tokens will be allowed to access the resource.

### Authorization Server

An authorization server is a central component to an Oauth system. The authorization server authenticates the User, i.e,
Resource owner and Client as well (авторизирует юзера и клиент апп). It provides mechanism for allowing resource owners to authorise clients and issues tokens to the client.

## Access token, Refresh token and Authorization Code

### Access tokens

Access token some times just called ass token, is issued by Authorization Server to the Client. It indicates the rights
that the Client has which are delegated by the User. (указывает права клиента делегированные юзером). The client sends
the token to the resource server when accessing the Protected Resource.

Access tokens are opaque(не являются прозрачными) to the Client., and the clients job is to carry the token, requesting
it from the authorization server and rpesenting it to the protected resource. (запросил у авторизационного сервера и передал
защищаемому)

However, tokens arent opaque to everyone in the system (оне не являются не прозрачными для всех в системе): the Authorization servers job is to issue the token, and the Resource server job is to validate the token. As such, they both need to be able to unsertand the token itself and what it stands for

### Refresh token

A refresh token is similar in concept to the access token. It is issued to the client by the auth server but the token
is never sent to the protected resource. Instead , the client uses refresh token to request new access tokens after
the access token has expired the validity period without involving user. (Клиент без участия пользователя использует
рефреш токен чтобы получить новый аксес токен после экспайра предидущего)

### Authorization Code

A temporary credential, called authorization code, is created by Authorization Server after authenticating and getting
consent of the resource owner (после аутентификациии и согласия юзера). The validity of the auth code is usually limited to a
couple of minutes or even less. Client sends authorization code and its own credentials to Authorization Server tokens endpoint
As a result, Authorization server sends an access token back to the client. As a result, authorization server sends an
access token back to the client.

The authorization code can only be processed by the token endpoint of the authorization server. It will never be sent directly to
the resource provider.

## Permissions and scope

### Permissions

Something related to a resource, not to the user (resource owner), of that resource. It is a declaration of an action that can be executed on a resource and exists independently of the user. For example for a customer profile resource, profile read/write/delete permissions are defined for a customer profile resource.

### Scopes

Scopes allow a client app to access a resource on behalf of the user. Scopes enable a mechanism to define what an applicaition
can do on behalf of the user. They peovide an important mechanism for fine-granted access to a client.

Clients can request certain scopes and User can approve or deny the scope to a given client. Eg, user approve or reject
read their profile with a scope profile read.

Once the user approves the scope, the auth server communicates the granted scopes to the to the resource server so that
it can access the resource. (Сервер авторизации передает предоставленные скоупы серверу ресурсов чтобы он мог получить доступ)

### OAuth Endpoints
