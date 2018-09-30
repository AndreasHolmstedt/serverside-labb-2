/*
  1. Hur många dokument finns det i din collection?
    use myDatabase
    db.products.count()

  2. Hur stort värde har alla produkter tillsammans? (summera priset)
    db.products.aggregate([{ $group: {_id: null, antal: { $sum: 1 }, summa: { $sum: "$price"}}}])

  3. Sortera produkterna i första hand fallande efter pris, i andra hand i stigande bokstavsordning efter namn.
    db.products.aggregate( {$sort: { price: -1, name: 1}})

  4. Vilka tre element kommer först i bokstavsordning, sorterat på namnet?
  (Det går att bara läsa de tre första dokument, men den bästa lösningen visar bara tre dokument.)
    db.products.aggregate({ $sort: {name: 1}}, { $limit: 3})

  5. Räkna ut det största och minsta värdet respektive medelvärdet för priset på produkterna.
    db.products.aggregate([ { $group: { _id: null, high: { $max: "$price"}, low: { $min: "$price"}, avg: { $avg: "$price"}}}])

  6. Hur många produkter har ett värde större än medelvärdet? (du kan använda värdet du räknade ut i uppgift 2.5)
    db.products.count({ price: { $gt: 149.4577 }})

  7. Hur många produkter finns det i varje kategori? (gruppera på kategori)
    db.products.aggregate([ { $group: { _id: "$category", count: { $sum: 1}}}])

  8. Välj ut en kategori och visa de fem dyraste produkterna. (match m.m.)
    db.products.aggregate([{ $match: { category: "socks" }}, { $sort: { price: -1 }}, { $limit: 5 }])

  9. Vilken är den tjugonde produkten, sorterat i bokstavsordning efter namn? (limit, skip)
    db.products.aggregate({ $sort: { name: 1 }}, { $limit: 20}, { $skip: 19 })

  10. Välj en av era kategorier. Hur stort värde har alla produkter i den kategorin?
    db.products.aggregate([{ $match: { category: "socks" }}, { $group: { sum: { $sum: "$price"}}}])
*/
