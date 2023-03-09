import { EventID } from '../../../../src/shared/seedwork/DomainEvent';
import { DomainEventManager } from '../../../../src/shared/seedwork/libs/DomainEventManager';

const RANDOM_UUID = 'c0c9328d-8770-417b-94f1-6051d837e22c'


describe('EntityEvents', () => {
    
    it('should return true for string ID', () => {
        
        const events = new DomainEventManager()

        events.push({
            data: 'fake-event1',
            ID: new EventID(RANDOM_UUID),
            name: 'fake-event',
            timestamp: new Date()
        })
        events.push({
            data: 'fake-event2',
            ID: new EventID(RANDOM_UUID),
            name: 'fake-event',
            timestamp: new Date()
        })
        
        const result = events.pull()
        expect(result).toHaveLength(2)
        expect(events.pull()).toHaveLength(0)

    })

})