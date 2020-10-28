import logo from './logo.svg';
import './App.css';

const App = () => {
  return (
      <div className="app-wrapper">
          <header className="header">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/647px-Apple_logo_black.svg.png" alt=""/>
          </header>
          <nav className="sidebar">
              <ul>
                  <li><a href="#">Link item</a></li>
                  <li><a href="#">Link item</a></li>
                  <li><a href="#">Link item</a></li>
                  <li><a href="#">Link item</a></li>
              </ul>
          </nav>
          <main className="content">
              <div className="content-header">
                  <img src="http://wallpapers-images.ru/1920x1080/nature/wallpapers/wallpapers-nature-013.jpg" alt=""/>
              </div>
              <div className="profile-item">
                  <div className="profile-ava">ava</div>
                  <div className="profile-content">description</div>
              </div>
              <div className="post">
                  <div className="post-title">post title</div>
                  <div className="post-message form-control">post message</div>
                  <div className="post-controls">
                      <div className="post-control">
                          <button>Send</button>
                      </div>
                  </div>
              </div>
              <div className="answer-item">
                  <p className="answer-item__txt">Answer text</p>
              </div>
          </main>
      </div>
  );
}

export default App;
