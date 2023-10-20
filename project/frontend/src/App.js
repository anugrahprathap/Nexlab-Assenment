import logo from './logo.svg';
import './App.css';

function App() {
  return (
   

    <div className="app-showcase">

<header>
    
    <nav>
      
    </nav>
    <h1>Hello Admin</h1>
    
    
    <a href="#">+ Add Apps</a>
  </header>
  <main>

  <a href="#">
    <div className="home-button">Home</div></a>
    <div className="main-section">
    <section>
      <input type="text" name="app_name" placeholder="App Name"/>
    </section>
    <section>
      
      <input type="text" name="app_category" placeholder='App Category'/>
    </section>
    <section>
      
      <input type="text" name="app_link" placeholder='App Category'/>
    </section>
    <section>

      <input type="select" name="sub_category" placeholder='Sub Category'/>
    </section>
    <button type="submit">ADD POINTS</button>
    </div>
    
  </main>
  <footer>
    <p>Copyright &copy; 2023</p>
  </footer>
    </div>



  );
}

export default App;
