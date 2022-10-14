/**
 * "If the user has not entered a value in the Name field, or if the user has entered less than 6
 * characters in the Price or Inventory fields, then display an alert message and stop the form from
 * being submitted."</code>
 * 
 * 
 * 
 * 
 * 
 * A:
 * 
 * You can use <code>required</code> attribute in your input fields.
 * <code>&lt;input type="text" name="Name" id="Name" required&gt;
 * </code>
 * @param evento - the event object
 * @returns the value of the input field.
 */
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("hizoClick").addEventListener('submit', validarFormulario); 
  });
  
  function validarFormulario(evento) {
    evento.preventDefault();
    var Name = document.getElementById('Name').value;
    if(Name.length == 0) {
      alert('Completa este campo');
      return;
    }
    var Price = document.getElementById('Price').value;
    if (Price.length < 6) {
      alert('Completa este campo');
      return;
    }
    var Inventory = document.getElementById('Inventory').value;
    if (Inventory.length < 6) {
      alert('Completa este campo');
      return;
    }
    this.submit();
  }