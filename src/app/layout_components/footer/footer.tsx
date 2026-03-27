import style from './footer.module.css';

export default function Footer() {
    return (
        <footer className={style.footer}>
            <p>WDD430 Team 17 | Handcrafted Haven Project | &copy;2026</p>
            <p>See our project board! <a href='https://github.com/users/woodrow-snow/projects/1'>Click here!</a></p>
        </footer>
    );
}