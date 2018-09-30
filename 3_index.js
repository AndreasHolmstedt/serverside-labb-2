/*

2.
  2.7 tog 13.44 sek med 10 510 000 dokument i databasen
  2.8 tog 0.1 sek med 10 510 000 dokument i databasen.
  2.9 tog 22.64 sek med 10 510 000 dokument i databasen

3.
  a. Samtliga queries kommer bli väldigt mycket snabbare.
  b. Endast 2.9 blev snabbare. Summeringen i 2.7 verkar ta lång tid ändå.
  c. Som sagt, endast 2.9 blev snabbare. 2.8 var redan väldigt snabb och 2.7 verkar inte ha förändrats.
  d. Försökte bygga ett index som kunde snabba på 2.7 men lyckades inte få bättre hastighet på den.
