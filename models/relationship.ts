import UsuarioRol from './usuariorol';
import Usuario from './usuario';
import Rol from './rol';

// Relacion de un Usuario a Muchos UsuariosRoles
Rol.hasMany(UsuarioRol);

// Relacion de un Usuario a Muchos UsuariosRoles
Usuario.hasMany(UsuarioRol);


// Relacion de un UsuarioRol a un Rol
UsuarioRol.belongsTo(Rol);

// Relacion de un UsuarioRol a un Usuario
UsuarioRol.belongsTo(Usuario);

