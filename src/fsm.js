class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (arguments.length !== 1) {
            throw Error('config must be passed');
        }
        this.config = config;
        this.stateArray = [config.initial];
        this.redoArray = [];
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.stateArray[this.stateArray.length - 1];
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (!this.config.states[state]) {
            throw Error('state isn\'t exist');
        }
        //this.stateArray.push(state);
        this.stateArray = [state];

    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if (!this.config.states[this.getState()].transitions[event]) {
            throw Error('event in current state isn\'t exist');
        }
        this.stateArray.push(this.config.states[this.getState()].transitions[event]);
        this.redoArray = [];
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.stateArray = [this.config.initial];
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        if (arguments.length === 0) {
            return Object.keys(this.config.states);
        }
        var arrayOfStates = [];
        for (var state in this.config.states) {
            if (this.config.states[state].transitions[event]) {
                arrayOfStates.push(state);
            }
        }
        return arrayOfStates;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.stateArray.length === 1) {
            if (this.stateArray[0] !== this.config.initial) {
                this.stateArray[0] = this.config.initial;
                return true;
            }
            return false;
        }
        this.redoArray.push(this.stateArray.pop());
        return true;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.redoArray.length === 0) {
            return false;
        }
        this.stateArray.push(this.redoArray.pop());
        return true;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        if (this.stateArray.length === 0) {
            this.redoArray = [];
            return;
        }
        this.stateArray = [this.config.initial];
        this.redoArray = [];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/