export default class Asset {
	public readonly uuid: string;

	constructor(
		public data: Blob,
		uuid?: string
	) {
		this.uuid = uuid || this.generateGuid();
	}

	public toString(): Promise<string> {
		return new Promise<string>(resolve => {
			try {
				const reader = new FileReader();
				reader.onload = event => resolve(event.target!.result);
				reader.readAsDataURL(this.data);
			} catch (e) {
				console.warn(e);
				resolve('');
			}
		});
	}

	public async toXmlObject(): Promise<any> {
		const b64 = await this.toString();

		return {
			$: {
				uuid: this.uuid
			},
			_: b64
		};
	}

	private generateGuid(): string {
		function s4() {
			return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
		}
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	}
}
