# Maeergister

Maeergister is een digitaal dashboard voor het beheren van een schoolsysteem.
Op het dashboard kan je klassen, leerlingen, cijfers en absenties beheren en worden deze gevisualiseerd.
Onder aan op deze pagina staat hoe je zelf de server kan runnen.

# Technische specificaties

Voor deze website en server worden meerdere technologieën, talen, frameworks en libraries gebruikt.
In dit overzicht kan je per onderwerp vinden welke technologie wordt gebruikt voor wat.

## Algemeen

### Next.js

Next.js is een framework om een SSR (Server Side Rendered) React applicatie en server te maken.
Met dit framework kan je een frontend en server in het zelfde project maken.
Dit framework zorgt er ook voor dat de website kan worden geexporteerd als Serverless functies

### Typescript

Het hele project maakt gebruik van typescript om type-safe javascript te kunnen schrijven, autocompletion te krijgen en zodat je eerder bugs kan verhelpen.

### GraphQL

GraphQL is een Query Languague die een laag vormt over een API waardoor je via GraphQL syntax data kan opvragen.
Via GraphQL voorkom je over en underfetching waardoor je in een request alle data die je nodig hebt kan ontvangen.
GraphQL gebruikt een eigen syntax waardoor je op de client kan definiëren welke data je wilt ontvangen.
Meer informatie: graphql.org

## Server

### Serverless

Serverless is een andere manier om een website te hosten.
Normaal staat je website op een server die altijd aan staat, maar met serverless kan je een server definiëren die pas aan gaat als het een request krijgt en die gelijk daarna weer uit gaat.
Hierdoor is de server gratis te hosten, en hoef je geen server te beheren.
Dit betekent wel dat de pagina's langer duren om te laden en er geen constante connectie met de database is.
Toch hebben we hiervoor gekozen omdat je met Next.js gratis de website online kan zetten.

### Webpack

Webpack is een package die intern wordt gebruikt door Nextjs om de react en de scripts te bundelen.
Dit zorg er ook voor dat de typescript wordt omgezet naar javascript.

### Authentecatie

Voor authentecatie worden cookies en JsonWebTokens gebruikt.
JsonWebTokens zijn JSON objecten die je secure in een authentecatie token kan opslaan.
Om hier meer informatie over te vinden kan je kijken op jwt.io

### Apollo server micro

Dit is een GraphQL server die je kan integreren met next.js waardoor je op de client via GraphQL de database kunnen queryen.

## Frontend

### React

React is een framework van facebook om moderne web apps te maken.
In React maak je components die kunnen reageren op data waardoor je deze heel makkelijk kan hergebruiken.
reactjs.org

### Bootstrap

Bootstrap is het meest gebruikte CSS framework dat gemaakt is door twitter en wordt in de hele frontend gebruikt voor de layout en styling
getbootstrap.com

### SASS

Sass is een vorm van css dat extra functies geeft en die je kan omzetten naar css.
Via Sass wordt bootstrap geladen (Bootstrap is gemaakt in Sass) en kan zo via een paar regels code de primary color worden omgezet naar ijburg, zodat je niet in elke bootstrap class de primary color hoeft aan te passen.

### Chartjs

Dit is een library om Charts te genereren en te gebruiken in react.

### Date-fns

Deze library helpt met dates in javascript en wordt gebruikt in de meeste grafieken.

### Firebase

Firebase is een service van google waardoor we realtime op meerdere apparaten de Notities kunnen synchroniseren

### Fontawesome

Dit zorgt voor de iconen op alle paginas.

## Database

### MySQL

Voor database maken we gebruik van MySQL, deze database wordt gehost op AWS.

### mysql2

Dit is de node package die verbinding maakt met de database.

# Setup

## Database

de database kan gemaakt worden via het bestand initdb.sql

## Website

1. Clone dit project naar een folder op je pc
2. Installeer node & npm
3. Verander de waardes tussen <> in lib/database.tsx met de waardes van de database
4. Run npm install in de folder
5. Run npx build
6. Run npx next start en ga naar localhost
