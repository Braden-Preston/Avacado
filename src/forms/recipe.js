import MobxReactForm from "mobx-react-form";
import dvr from "mobx-react-form/lib/validators/DVR";
import validatorjs from "validatorjs";

const plugins = {
  dvr: dvr(validatorjs)
};

const fields = [
//   recipeForm = observable<RecipeDocument>({
//     name: this.recipe.data.name,
//     description: this.recipe.data.description,
//     prep_time: this.recipe.data.prep_time,
//     tags: this.recipe.data.tags,
//     img_url: this.recipe.data.img_url,
//     favorite: this.recipe.data.favorite,
//     ingredients: this.recipe.data.ingredients,
//     instructions: this.recipe.data.instructions,
// })
{
  name: "name",
  label: "Recipe Name",
  placeholder: "",
  rules: "required|string|between:5,20",
  value: "A New Recipe"
},
{
  name: "description",
  label: "Description",
  placeholder: "",
  rules: "required|string|between:10,30",
  value: "A wonderful new recipe!"
},
{
  name: "prep_time",
  label: "Serves In",
  placeholder: "",
  rules: "required|numeric|min:0",
  type: "boolean",
  value: 15
},
{
  name: "tags",
  label: "Category(s)",
  placeholder: "",
  rules: "required|array|min:1",
  value: "[snack, dinner]"
},
{
  name: "img_url",
  label: "Cover Image URL (optional)",
  placeholder: "",
  rules: "url",
  value: "https://imgur.io/icing.png"
},
{
  name: "favorite",
  label: "Favorite (optional)",
  placeholder: "",
  rules: "boolean",
  value: "true"
},
{
  name: "ingredients",
  label: "Ingredients",
  placeholder: "",
  rules: "required|array|min:1",
  value: "[a, b]"
},
{
  name: "instructions",
  label: "Instructions",
  placeholder: "",
  rules: "required|string|min:10",
  value: "Here is a basic set of instructions..."
},


  // {
  //   name: "email",
  //   label: "Email",
  //   placeholder: "Insert Email",
  //   rules: "required|email|string|between:5,25",
  //   value: "s.jobs@apple.com"
  // },
  // {
  //   name: "password",
  //   label: "Password",
  //   placeholder: "Insert Password",
  //   rules: "required|string|between:5,25"
  // },
  // {
  //   name: "passwordConfirm",
  //   label: "Password Confirmation",
  //   placeholder: "Confirm Password",
  //   rules: "required|string|same:password"
  // }
];

const hooks = {
  // onSuccess(form) {
  //   alert("Form is valid! Send the request here.");
  //   // get field values
  //   console.log("Form Values!", form.values());
  // },
  onError(form, cat) {
    alert("Form has errors!");
    // get all form errors
    console.table("All form errors", form.errors());
    console.log(cat)
  }
};

export default new MobxReactForm({ fields }, { plugins, hooks });



// export default class recipeFormNew extends Form {

//     /*
//       Below we are returning a `plugins` object using the `validatorjs` package
//       to enable `DVR` functionalities (Declarative Validation Rules).
//     */
//     // plugins() {
//     //   return {
//     //     dvr: dvr(validatorjs),
//     //   };
//     // }
  
//     /*
//       Return the `fields` as a collection into the `setup()` method
//       with a `rules` property for the validation.
//     */
//     setup() {
//       return {
//         fields: [{
//           name: 'email',
//           label: 'Email',
//           placeholder: 'Insert Email',
//         //   rules: 'required|email|string|between:5,25',
//           value: 's.jobs@apple.com'
//         }, {
//           name: 'password',
//           label: 'Password',
//           placeholder: 'Insert Password',
//         //   rules: 'required|string|between:5,25',
//         }, {
//           name: 'passwordConfirm',
//           label: 'Password Confirmation',
//           placeholder: 'Confirm Password',
//         //   rules: 'required|string|same:password',
//         }],
//       };
//     }
  
//     /*
//       Event Hooks
//     */
//     hooks() {
//       return {
//         /*
//           Success Validation Hook
//         */
//         onSuccess(form) {
//           alert('Form is valid! Send the request here.');
//           // get field values
//           console.log('Form Values!', form.values());
//         },
//         /*
//           Error Validation Hook
//         */
//         onError(form) {
//           alert('Form has errors!');
//           // get all form errors
//           console.log('All form errors', form.errors());
//         }
//       };
//     }
//   }