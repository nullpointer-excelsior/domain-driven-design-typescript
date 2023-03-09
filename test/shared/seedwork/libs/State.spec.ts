import { State } from '././../../../../src/shared/seedwork/libs/State';

describe('State', () => {
    let initialState: { count: number };
    let state: State<typeof initialState>;

    beforeEach(() => {
        initialState = { count: 0 };
        state = new State(initialState);
    });

    describe('addBeforeUpdateListener', () => {
        it('should call the listener when set() is called', () => {
            const listener = jest.fn();
            state.addBeforeUpdateListener(listener);
            state.set({ count: 1 });
            expect(listener).toHaveBeenCalledWith({ count: 1 });
        });
    });

    describe('addAfterUpdateListener', () => {
        it('should call the listener when set() is called', () => {
            const listener = jest.fn();
            state.addAfterUpdateListener(listener);
            state.set({ count: 1 });
            expect(listener).toHaveBeenCalledWith({ count: 1 });
        });
    });

    describe('set', () => {
        it('should update the state', () => {
            state.set({ count: 1 });
            expect(state.get()).toEqual({ count: 1 });
        });
    });

    describe('reduce', () => {
        it('should update the state using a reducer function', () => {
            state.reduce((prevState) => ({ count: prevState.count + 1 }));
            expect(state.get()).toEqual({ count: 1 });
        });
    });

    describe('get', () => {
        it('should return the current state', () => {
            expect(state.get()).toEqual(initialState);
        });
        it('should dont mutate the state', () => {
            state.get().count = 1
            expect(state.get()).toEqual(initialState);
        });
    });
});