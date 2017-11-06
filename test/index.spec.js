import firebase from 'firebase';

describe('karma-firebase', () => {
  let ref;

  before(() => {
    firebase.initializeApp({ databaseURL: 'ws://127.0.1:5000' });
    ref = firebase.app().database().ref();
  });

  it('check initial database value', () => ref.child('init').once('value')
    .then((snap) => {
      expect(snap.val()).to.be.true;
    }));

  it('ref.toString() should return the correct URL', () => {
    expect(ref.toString()).to.be.equal('http://127.0.1:5000/');
  });

  describe('Write actions', () => {
    it('.push()', () => ref.push({ name: 'john' })
      .then(data => ref.child(data.key).once('value'))
      .then((snap) => {
        expect(snap.val()).to.be.deep.equal({ name: 'john' });
      }));

    it('.set()', () => ref.child('set').set({ name: 'john' })
      .then(() => ref.child('set').once('value'))
      .then((snap) => {
        expect(snap.val()).to.be.deep.equal({ name: 'john' });
      }));

    it('.update()', () => ref.child('update').set({ name: 'john' })
      .then(() => ref.child('update').update({ name: 'doe' }))
      .then(() => ref.child('update').once('value'))
      .then((snap) => {
        expect(snap.val()).to.be.deep.equal({ name: 'doe' });
      }));

    it('.remove()', () => {
      let key;

      return ref.push({ name: 'john' })
        .then((data) => {
          key = data.key;
          return ref.child(data.key).remove();
        })
        .then(() => ref.child(key).once('value'))
        .then((snap) => {
          expect(snap.val()).to.be.null;
        });
    });
  });

  describe('Read actions', () => {
    it('.once()', () => ref.push({ name: 'john' })
      .then(data => ref.child(data.key).once('value'))
      .then((snap) => {
        expect(snap.val()).to.be.deep.equal({ name: 'john' });
      }));
  });
});
