<h2>Banken</h2>

![image](https://user-images.githubusercontent.com/30622818/169498416-483efdfd-aa48-4d0d-a939-aefddfb1731d.png)

Designen är rakt av lånad från ekobanken.se

Din uppgift är att programmera en enkel “bank”, där en användare kan skapa konton, och sätta in, ta ut. 

Projektet skall bestå av ett REST-API, samt en frontend som kommunicerar med API:et via Javascript. Kommunikationen mellan API:et och frontend skall vara med JSON.  
Det är frivilligt hur mycket tid du vill lägga på design och CSS.

Ett konto på banken har följande egenskaper:
<li>Kontonummer</li>
<li>Kontonamn</li>
<li>Mängden pengar på kontot</li>

Typ av konto - eget påhitt

Din frontend skall ha följande:
Ett formulär för att lägga till ett nytt konto, med namn och mängd pengar. Kontonumret skall skapas automatiskt (t.ex. Mongos ID, eller https://www.npmjs.com/package/uuid). 
En lista på alla konton med namn, nummer och mängden pengar. 
För varje konto skall det vara möjligt att lägga till pengar. 
För varje konto skall det vara möjligt att ta bort pengar. OBS! Det skall inte gå att ta bort mer pengar än det finns på kontot!
Det skall gå att ta bort konton.

Banken skall vara skyddad så att man måste logga in för att använda den. 
Det räcker med att alla användare kan hantera samma, alltså alla konton; men om du vill får du göra så att varje användare har varsina konton. 
Om du gör så, behöver du fundera på om du skall knyta ihop konton och användare med referenser (https://www.mongodb.com/docs/manual/tutorial/model-referenced-one-to-many-relationships-between-documents/), eller om du skall ha endast en collection med användare och ha kontona som en del av användar-documentet. 

Kontofunktioner:
<li>Det skall gå att skapa nya användare. </li>
<li>Lösenord skall vara krypterade i databasen.</li>
<li>Man skall kunna logga in. </li>
<li> Man ska inte kunna se konto-information om man inte är inloggad.</li>
Admin-vy när man är inloggad admin (här med alla konton):

![image](https://user-images.githubusercontent.com/30622818/169498339-08784b72-bc86-4765-a6d3-395deb457828.png)

samt ett enda konto:
![image](https://user-images.githubusercontent.com/30622818/169498375-83d6452f-ee9e-4f25-9535-64d531deb54f.png)


Skapa konto för alla (separat vy för inloggad under /admin)

![image](https://user-images.githubusercontent.com/30622818/169498032-20f724d3-5480-400a-8c6c-91a2e990ce64.png)

/index bli kund:
![image](https://user-images.githubusercontent.com/30622818/169498247-807b4802-430f-496a-952e-5e705c6ffbc2.png)

