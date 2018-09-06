
exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('leaderboard').del()
    .then(function () {
      // Inserts seed entries
      return knex('leaderboard').insert([
        {id: 1, colName: 'rowValue1'},
        {id: 2, colName: 'rowValue2'},
        {id: 3, colName: 'rowValue3'}
      ])
    })
}
