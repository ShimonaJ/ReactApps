  // bootstrap.js
export default function bootstrap(orm) {
    // Get the empty state according to our schema.
    const initialState = orm.getEmptyState(); // getDefaultState -> getEmptyState
    const session = orm.session(initialState);
    // Begin a mutating session with that state.
    // `state` will be mutated.
  
    // Return the whole Redux initial state.
    return {
        orm: session.state,
        selectedCategory:'',
        sortBy:'timestamp'
    };
}