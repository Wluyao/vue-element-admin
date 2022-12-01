import { tupleStr } from './type'

// 项目中所有自定义事件名称
const eventName = tupleStr(
	//
	'changeEvent'
)

type EventName = typeof eventName[number]

class Event {
	public eventName: EventName
	public handler: (...args: any[]) => void

	constructor(eventName: EventName, handler: (...args: any[]) => void) {
		this.eventName = eventName
		this.handler = handler
	}
}

class EventBus {
	private events: Set<Event> = new Set()

	public on(eventName: EventName, handler: (...args: any[]) => void) {
		const event = new Event(eventName, handler)
		this.events.add(event)
		return () => this.events.delete(event)
	}

	public off(eventName: EventName) {
		this.events.forEach((event) => {
			if (eventName === event.eventName) {
				this.events.delete(event)
			}
		})
	}

	public emit(eventName: EventName, ...args: any[]) {
		this.events.forEach((event) => {
			if (eventName === event.eventName) {
				event.handler(...args)
			}
		})
	}
}

const eventBus = new EventBus()

/**
 * @example

```
useEffect(() => {
	const removeHandler = eventBus.on('changeMode', () => {})
	return removeHandler
}, [])
```
 */

export default eventBus
