
exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('scores').del()
    .then(() => {
      // Inserts seed entries
      return knex('scores').insert([
        {id: 44401, username: 'billybob', score: 8, category: 'general', category_id: 9, difficulty: 'medium'},
        {id: 44402, username: 'quizomatic', score: 4, category: 'film', category_id: 11, difficulty: 'easy'},
        {id: 44403, username: 'snakemachine', score: 10, category: 'science & nature', category_id: 17, difficulty: 'hard'}
      ])
    })
}
