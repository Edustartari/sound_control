import React from 'react';
import './App.css';
import { Howl, Howler } from 'howler';
import sounds_list from './sounds/sounds_list';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';


class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			rhythm: 'guarania',
			volume: {
				sound1: 1,
				sound2: 1,
				sound3: 1,
				sound4: 1
			},
			velocity: 0.5
		};
		this.change_rhythm = this.change_rhythm.bind(this);
		this.play = this.play.bind(this);
		this.pause = this.pause.bind(this);
		this.change_volume = this.change_volume.bind(this);
		this.change_velocity = this.change_velocity.bind(this);

		this.sound1 = new Howl({ src: [sounds_list[this.state.rhythm].sound1] });
		this.sound2 = new Howl({ src: [sounds_list[this.state.rhythm].sound2] });
		this.sound3 = new Howl({ src: [sounds_list[this.state.rhythm].sound3] });
		this.sound4 = new Howl({ src: [sounds_list[this.state.rhythm].sound4] });
	}

	change_rhythm(event) {
		this.setState({ rhythm: event.target.value });
	}

	play() {
		if(this.sound1.playing()) {
			return;
		}

		this.sound1 = new Howl({ src: [sounds_list[this.state.rhythm].sound1], volume: this.state.volume.sound1, rate: this.state.velocity + 0.5, loop: true });
		this.sound2 = new Howl({ src: [sounds_list[this.state.rhythm].sound2], volume: this.state.volume.sound2, rate: this.state.velocity + 0.5, loop: true });
		this.sound3 = new Howl({ src: [sounds_list[this.state.rhythm].sound3], volume: this.state.volume.sound3, rate: this.state.velocity + 0.5, loop: true });
		this.sound4 = new Howl({ src: [sounds_list[this.state.rhythm].sound4], volume: this.state.volume.sound4, rate: this.state.velocity + 0.5, loop: true });

		this.sound1.play();
		this.sound2.play();
		this.sound3.play();
		this.sound4.play();
	}

	pause() {
		this.sound1.pause();
		this.sound2.pause();
		this.sound3.pause();
		this.sound4.pause();
	}

	change_volume(sound, event) {
		let value = event.target.value / 100;

		let temporary_volume = this.state.volume;
		temporary_volume[sound] = value;
		this.setState({ volume: temporary_volume });

		this[sound].volume(value);
	}

	change_velocity(event) {
		let value = event.target.value / 100;

		this.setState({ velocity: value });
		value = 0.5 + value;
		this.sound1.rate(value);
		this.sound2.rate(value);
		this.sound3.rate(value);
		this.sound4.rate(value);
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.rhythm !== this.state.rhythm) {
			this.pause();

			let volume = {
				sound1: 1,
				sound2: 1,
				sound3: 1,
				sound4: 1
			};
			this.setState({ volume: volume });
			let velocity = 0.5;
			this.setState({ velocity: velocity });

			this.sound1 = new Howl({ src: [sounds_list[this.state.rhythm].sound1], volume: volume.sound1, rate: velocity + 0.5 });
			this.sound2 = new Howl({ src: [sounds_list[this.state.rhythm].sound2], volume: volume.sound2, rate: velocity + 0.5 });
			this.sound3 = new Howl({ src: [sounds_list[this.state.rhythm].sound3], volume: volume.sound3, rate: velocity + 0.5 });
			this.sound4 = new Howl({ src: [sounds_list[this.state.rhythm].sound4], volume: volume.sound4, rate: velocity + 0.5 });
		}
	}

	render() {
		return (
			<div className='batuque-background'>
				<div className='batuque-header'>ritmos del camdomblé</div>
				<div className='batuque-menu'>
					<div className='batuque-menu-select'>
						<FormControl variant='standard' sx={{ m: 1, minWidth: 120 }}>
							<Select
								labelId='demo-simple-select-standard-label'
								id='demo-simple-select-standard'
								value={this.state.rhythm}
								onChange={e => this.change_rhythm(e)}
								label='Age'
							>
								{Object.keys(sounds_list).map(rhythm => (
									<MenuItem value={rhythm}>{rhythm}</MenuItem>
								))}
							</Select>
						</FormControl>
					</div>
					<div className='batuque-menu-player'>
						{this.sound1.playing() }
						<div className='batuque-menu-player-play' onClick={this.play}>
							play
						</div>
						<div className='batuque-menu-player-pause' onClick={this.pause}>
							pause
						</div>
					</div>
				</div>
				<div className='batuque-container'>
					<div className='batuque-instrument'>
						<div className='batuque-instrument-icon'>1</div>
						<div className='batuque-instrument-volume'>
							<Stack sx={{ height: 300 }} spacing={1} direction='row'>
								<Slider
									aria-label='Temperature'
									orientation='vertical'
									defaultValue={100}
									onChange={e => this.change_volume('sound1', e)}
									value={this.state.volume.sound1 * 100}
								/>
							</Stack>
						</div>
					</div>
					<div className='batuque-instrument'>
						<div className='batuque-instrument-icon'>2</div>
						<div className='batuque-instrument-volume'>
							<Stack sx={{ height: 300 }} spacing={1} direction='row'>
								<Slider
									aria-label='Temperature'
									orientation='vertical'
									defaultValue={100}
									onChange={e => this.change_volume('sound2', e)}
									value={this.state.volume.sound2 * 100}
								/>
							</Stack>
						</div>
					</div>
					<div className='batuque-instrument'>
						<div className='batuque-instrument-icon'>3</div>
						<div className='batuque-instrument-volume'>
							<Stack sx={{ height: 300 }} spacing={1} direction='row'>
								<Slider
									aria-label='Temperature'
									orientation='vertical'
									defaultValue={100}
									onChange={e => this.change_volume('sound3', e)}
									value={this.state.volume.sound3 * 100}
								/>
							</Stack>
						</div>
					</div>
					<div className='batuque-instrument'>
						<div className='batuque-instrument-icon'>4</div>
						<div className='batuque-instrument-volume'>
							<Stack sx={{ height: 300 }} spacing={1} direction='row'>
								<Slider
									aria-label='Temperature'
									orientation='vertical'
									defaultValue={100}
									onChange={e => this.change_volume('sound4', e)}
									value={this.state.volume.sound4 * 100}
								/>
							</Stack>
						</div>
					</div>
				</div>
				<div className='batuque-footer'>
					<div className='batuque-footer-speed'>
						<div className='batuque-footer-speed-title'>tempo</div>
						<div className='batuque-footer-speed-control'>
							<Slider
								defaultValue={50}
								aria-label='Default'
								onChange={e => this.change_velocity(e)}
								value={this.state.velocity * 100}
							/>
						</div>
					</div>
					<div className='batuque-footer-speed-number'>{Math.round(this.state.velocity * 100)}</div>
				</div>
			</div>
		);
	}
}

export default App;
