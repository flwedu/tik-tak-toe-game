export interface BaseEventEmitterType {
	[key: string]: any;
}

export class EventEmitter<T extends BaseEventEmitterType> {
	private eventsMap: Map<keyof T, ((data: any) => void)[]>;

	constructor() {
		this.eventsMap = new Map<keyof T, ((data: any) => void)[]>();
	}

	emit<TEvent extends keyof T = keyof T, TData extends T[TEvent] = T[TEvent]>(
		eventName: TEvent,
		data: TData,
	) {
		const eventMapEntry = this.eventsMap.get(eventName);
		if (!eventMapEntry) {
			return;
		}
		for (const callback of eventMapEntry) {
			callback(data);
		}
	}

	on<TEvent extends keyof T = keyof T, TData extends T[TEvent] = T[TEvent]>(
		eventName: TEvent,
		callback: (data: TData) => void,
	) {
		const eventMapEntry = this.eventsMap.get(eventName);
		if (eventMapEntry) {
			eventMapEntry.push(callback);
			return;
		}
		this.eventsMap.set(eventName, [callback]);
	}
}
