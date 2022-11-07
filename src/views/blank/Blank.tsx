import { ref } from 'vue'
import Demo from './Demo'
import Test from './Test'

const Blank = () => {
	const demoRef = ref()
	const testRef = ref()
	const title = ref('title')

	const handleClickDemo = (value) => {
		console.log(value)
		demoRef.value.open()
	}

	const handleClickTest = (value) => {
		console.log(value)
		testRef.value.open()
	}

	return (
		<div>
			<Demo ref={demoRef} mode={title.value} onTrigger={handleClickDemo}>
				<div>这是slot</div>
			</Demo>

			<Test ref={testRef} mode={title.value} onTrigger={handleClickTest}>
				<div>这是slot</div>
			</Test>
		</div>
	)
}

export default Blank
